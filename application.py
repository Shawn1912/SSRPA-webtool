from flask import Flask, render_template, redirect, url_for, flash, request, jsonify
from flask_login import (
    LoginManager,
    login_user,
    current_user,
    login_required,
    logout_user,
)

# from wtform_fields import *
# from models import *

import psycopg2

# OTP lbiraries
import smtplib

from passlib.handlers.pbkdf2 import pbkdf2_sha256
from twilio.rest import Client
from email.message import EmailMessage
import math
import random

from other import user_email_id, user_pwd, account_sid, auth_token, from_phone, nums

client = Client(account_sid, auth_token)


# Configure app
# to run python for web application
app = Flask(__name__)
app.secret_key = "replace later"


@app.route("/", methods=["GET", "POST"])
def userlogin():
    if request.method == "POST":
        try:
            connection = psycopg2.connect(
                user="postgres",
                password="postgres",
                host="localhost",
                port="5432",
                database="postgres",
            )

            cursor = connection.cursor()

            email_entered = request.form["email"]
            password_entered = request.form["password"]
            print(email_entered, password_entered)
            record_to_search = (email_entered,)
            sql_login_query = """SELECT * FROM users WHERE users.email = %s"""
            cursor.execute(sql_login_query, record_to_search)
            # hash the password entered by the user
            hash = pbkdf2_sha256.hash(password_entered)
            # check the hashed password
            pbkdf2_sha256.verify(password_entered, hash)
            print("Password successful")
            # check the role of the user
            sql_role_query = """SELECT users.designation, 
             users.motp, users.eotp, users.phone, users.email, users.designation FROM users WHERE users.email = %s"""
            cursor.execute(sql_role_query, record_to_search)
            query = cursor.fetchone()
            designation = query[0]
            motp = query[1]
            eotp = query[2]
            phone = query[3]
            email = query[4]
            role = query[5]
            print(designation, motp, eotp, phone, email)
            if (motp == False) and (eotp == False):
                # Need of OTP
                client = Client(account_sid, auth_token)
                # send OTP on email
                email_input = email
                # the account which sends OTP , edit values in other.py
                usr_mail = user_email_id
                # "" password, edit values in other.py
                usr_pwd = user_pwd
                # generating email OTP
                # selects a random number from a list(nums) in other.py file
                # this method will be used only for testing purposes
                email_otp = random.choice(nums)
                content = (
                    "Hello Use This OTP to sign in to your SS RPA account! Do not Share this code: "
                    + str(email_otp)
                )

                msg = EmailMessage()
                msg["Subject"] = "OTP Verification For SS RPA Login."
                msg["From"] = usr_mail
                msg["To"] = email_input
                msg.set_content(content)

                with smtplib.SMTP(
                    "smtp.gmail.com", 587
                ) as smtp:  # make sure to enable "less secure apps" on google before sending (not recievig) mail , link:https://myaccount.google.com/lesssecureapps
                    smtp.ehlo()
                    smtp.starttls()
                    smtp.ehlo()

                    smtp.login(usr_mail, usr_pwd)
                    smtp.send_message(msg)
                print("Printing email OTP")
                print(email_otp)

                # send OTP on mobile
                phone_num = phone
                # right now, for indian numbers only
                phone_number = "+91" + str(phone_num)
                # generating email OTP
                # selects a random number from a list(nums) in other.py file
                # this method will be used only for testing purposes
                mobile_otp = random.choice(nums)
                msg = (
                    "Your One Time Password(OTP) for SS RPA is:"
                    + str(mobile_otp)
                    + " Do Not Share This Code!"
                )
                message = client.messages.create(
                    body=msg,
                    from_=str(from_phone),
                    status_callback="http://postb.in/1234abcd",  # you can use this too maybe(?)
                    to=str(phone_number),
                )
                print("Mobile OTP")
                print(mobile_otp)
                # update database with motp and eotp
                sql_update_m_query = (
                    """Update users set m_otp_received = %s where email = %s"""
                )
                cursor.execute(sql_update_m_query, (mobile_otp, email))
                sql_update_e_query = (
                    """Update users set e_otp_received = %s where email = %s"""
                )
                cursor.execute(sql_update_e_query, (email_otp, email))
                connection.commit()
                return redirect(url_for("otp", email=email))
                # connection.commit()
            else:
                if role == "Admin":
                    return redirect(url_for("dashboard"))
                else:
                    return redirect(url_for("masterpageuser"))
            connection.commit()
            print("Logged in sucessfully")

        except (Exception, psycopg2.Error) as error:
            print("Error in select operation", error)

        finally:
            # closing database connection.
            if connection:
                cursor.close()
                connection.close()
                print("PostgreSQL connection is closed")
    return render_template("login_user.html")


@app.route("/otp/<email>", methods=["GET", "POST"])
def otp(email=None):
    print("Printing email")
    print(email)
    try:
        if request.method == "POST":
            connection = psycopg2.connect(
                user="postgres",
                password="postgres",
                host="localhost",
                port="5432",
                database="postgres",
            )

            cursor = connection.cursor()
            email = (email,)
            sql_email_query = """SELECT users.m_otp_received, 
            users.e_otp_received,users.designation FROM users WHERE users.email = %s"""
            cursor.execute(sql_email_query, email)
            query = cursor.fetchone()
            motp = query[0]
            eotp = query[1]
            role = query[2]
            print("Mobile OTP")
            print(motp)
            print("Email OTP")
            print(eotp)
            print("Role")
            print(role)
            mobile_otp_entered = request.form["m_otp"]
            email_otp_entered = request.form["e_otp"]
            if mobile_otp_entered == motp and email_otp_entered == eotp:
                motp_set = True
                eotp_set = True
                sql_update_m_query = """Update users set motp = %s where email = %s"""
                cursor.execute(sql_update_m_query, (motp_set, email))
                sql_update_e_query = """Update users set eotp = %s where email = %s"""
                cursor.execute(sql_update_e_query, (eotp_set, email))
                connection.commit()
                cursor.close()
                connection.close()
                if role == "Admin":
                    return redirect(url_for("masterpage"))
                else:
                    return redirect(url_for("masterpageuser"))
            else:
                print("OTP is WRONG")
                return "Wrong OTP entered"
            return "not in if"

    except (Exception, psycopg2.Error) as error:
        print("Error in select operation", error)

    return render_template("otp_screen.html", email=email)


@app.route("/createuser", methods=["GET", "POST"])
def createuser():
    if request.method == "POST":
        connection = psycopg2.connect(
            user="postgres",
            password="postgres",
            host="localhost",
            port="5432",
            database="postgres",
        )

        cursor = connection.cursor()
        try:
            # connection = psycopg2.connect(
            #     user="postgres",
            #     password="postgres",
            #     host="localhost",
            #     port="5432",
            #     database="postgres",
            # )

            # cursor = connection.cursor()

            username = request.form["username"]
            email = request.form["email"]
            phone = request.form["phone"]
            password = request.form["password"]
            #         # hashing the password
            #         # pbkdf2_sha256.using(rounds=1000, salt_size=8).hash(password) to modify the salt & rounds
            hashed_pwd = pbkdf2_sha256.hash(password)
            gender = request.form["gender"]
            designation = request.form["role"]
            status = "Disable"
            sso = False
            motp = False
            eotp = False
            m_otp_received = "None"
            e_otp_received = "None"
            print(
                username,
                email,
                phone,
                hashed_pwd,
                gender,
                designation,
                status,
                sso,
                motp,
                eotp,
                m_otp_received,
                e_otp_received,
            )

            sql_insert_query = """INSERT INTO users (username, email, phone, password,
            gender, designation, status, sso, motp, eotp, m_otp_received, e_otp_received) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
            record_to_insert = (
                username,
                email,
                phone,
                hashed_pwd,
                gender,
                designation,
                status,
                sso,
                motp,
                eotp,
                m_otp_received,
                e_otp_received,
            )
            cursor.execute(sql_insert_query, record_to_insert)
            connection.commit()
            print("Record inserted sucessfully")
            return redirect(url_for("userlogin"))

        except (Exception, psycopg2.Error) as error:
            print("Error in select operation", error)

        finally:
            # closing database connection.
            if connection:
                cursor.close()
                connection.close()
                print("PostgreSQL connection is closed")
    return render_template("index.html")


@app.route("/masterpage", methods=["GET"])
def masterpage():
    return render_template("master_page.html")


@app.route("/dashboard", methods=["GET"])
def dashboard():
    return render_template("dashboard.html")


@app.route("/masterpageuser", methods=["GET"])
def masterpageuser():
    return render_template("master_page_user.html")


@app.route("/projectpage", methods=["GET"])
def projectpage():
    return render_template("project_page.html")


@app.route("/createproject", methods=["GET"])
def createprojectpage():
    return render_template("create_project_form_1.html")


@app.route("/processpage", methods=["GET"])
def processpage():
    return render_template("process_page.html")


@app.route("/userprofile", methods=["GET"])
def userprofile():
    return render_template("user_profile.html")


@app.route("/nodespage", methods=["GET"])
def nodespage():
    return render_template("nodes_page.html")


@app.route("/dashboardnomaster", methods=["GET"])
def dashboardnomaster():
    return render_template("dashboard_nomaster.html")


@app.route("/listuser", methods=["GET"])
def listuser():
    try:
        connection = psycopg2.connect(
            user="postgres",
            password="postgres",
            host="localhost",
            port="5432",
            database="postgres",
        )

        cursor = connection.cursor()

        sql_select_query = """select * from users"""
        cursor.execute(sql_select_query)
        print("Selecting rows from users")
        users_records = cursor.fetchall()
        return render_template("list_user.html", myUser=users_records)
        connection.commit()

    except (Exception, psycopg2.Error) as error:
        print("Error in select operation", error)

    finally:
        # closing database connection.
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")

    return render_template("list_user.html")


@app.route("/activate", methods=["POST"])
def enable():
    if request.method == "POST":
        try:
            connection = psycopg2.connect(
                user="postgres",
                password="postgres",
                host="localhost",
                port="5432",
                database="postgres",
            )

            cursor = connection.cursor()

            email = request.form["email"]
            status = "Activate"
            print(email)
            print(status)
            sql_update_query = """UPDATE users SET status = %s WHERE email = %s"""
            record_to_update = (status, email)
            cursor.execute(sql_update_query, record_to_update)
            connection.commit()
            print("Record updated sucessfully")

            sql_select_query = """SELECT * FROM users"""
            cursor.execute(sql_select_query)
            users_records = cursor.fetchall()
            print(users_records)
            connection.commit()
            print("Record after updation")

        except (Exception, psycopg2.Error) as error:
            print("Error in activate operation", error)

        finally:
            # closing database connection.
            if connection:
                cursor.close()
                connection.close()
                print("PostgreSQL connection is closed")
    return redirect(url_for("listuser"))


@app.route("/disable", methods=["POST"])
def disable():
    if request.method == "POST":
        try:
            connection = psycopg2.connect(
                user="postgres",
                password="postgres",
                host="localhost",
                port="5432",
                database="postgres",
            )

            cursor = connection.cursor()

            email = request.form["email"]
            status = "Disable"
            print(email)
            print(status)
            sql_update_query = """UPDATE users SET status = %s WHERE email = %s"""
            record_to_update = (status, email)
            cursor.execute(sql_update_query, record_to_update)
            connection.commit()
            print("Record disable sucessfully")

            sql_select_query = """SELECT * FROM users"""
            cursor.execute(sql_select_query)
            users_records = cursor.fetchall()
            print(users_records)
            connection.commit()
            print("Record after updation")

        except (Exception, psycopg2.Error) as error:
            print("Error in disable operation", error)

        finally:
            # closing database connection.
            if connection:
                cursor.close()
                connection.close()
                print("PostgreSQL connection is closed")
    return redirect(url_for("listuser"))


@app.route("/delete", methods=["POST"])
def delete():
    if request.method == "POST":
        try:
            connection = psycopg2.connect(
                user="postgres",
                password="postgres",
                host="localhost",
                port="5432",
                database="postgres",
            )

            cursor = connection.cursor()

            email = request.form["email"]
            status = "Delete"
            print(email)
            print(status)
            sql_update_query = """UPDATE users SET status = %s WHERE email = %s"""
            record_to_update = (status, email)
            cursor.execute(sql_update_query, record_to_update)
            connection.commit()
            print("Record updated sucessfully")

            sql_select_query = """SELECT * FROM users"""
            cursor.execute(sql_select_query)
            users_records = cursor.fetchall()
            print(users_records)
            connection.commit()
            print("Record after updation")

        except (Exception, psycopg2.Error) as error:
            print("Error in delete operation", error)

        finally:
            # closing database connection.
            if connection:
                cursor.close()
                connection.close()
                print("PostgreSQL connection is closed")
    return redirect(url_for("listuser"))


# it will return the name of the module
if __name__ == "__main__":

    app.run(debug=True)
