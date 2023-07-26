from flask import render_template, request, redirect, flash, make_response
from flask_login import login_user
from werkzeug.security import generate_password_hash, check_password_hash
from .communicate_with_db import add_item_to_db, get_user_by_nickname
from .communicate_with_db import *
from .database import User, Event
from .forms import LoginForm, SignupForm
from .import app
from flask_jwt_extended import jwt_required, get_jwt_indentity, create_access_token
from datetime import timedelta, datetime, date
import json

def convert_time_to_object(time_to_format):
    return datetime.strptime(time_to_format, "%H:%M").time()

def convert_date_to_object(date_to_format):
    return datetime.strptime(date_to_format, "%Y-%m-%d").date()

def prepare_data_to_database(data):
    data = json.loads(data)
    data["user"] = 5
    data["date"] = convert_date_to_object(data["date"])
    data["time"] = convert_time_to_object(data["time"])
    return data

@app.route("/create_event", methods=["POST"])
def create_event():
    if request.data:
        print(request.data)
        request_data = prepare_data_to_database(request.data)

        print(request_data)
        event = Event(**request_data)
        add_item_to_db(event)

        response = make_response("success")
        response.status_code = 200

        return response
    return make_response("there`s no data", 400)


@app.route("/main")
def main():
    mock = {}
    for i in range(5):
        event_date = date.today() + timedelta(days=i)
        date_str = event_date.strtime('%d %B')
        mock[date_str] = ["event1", "event2"]
    return render_template("main.html", events_for_5_days=mock)


@app.route("/login", methods=["GET"])
def login():
    form = LoginForm()
    if request.method == "POST":
        user = get_user_by_nickname(form.nickname.data)

        if user:
            is_password_correct = check_password_hash(user.password,
                                                      form.password.data)
            if is_password_correct:
                login_user(user)
                return redirect("main")
            flash("Password id incorrect")

        flash("There is not user with this name")
        return redirect("login")
    return render_template("login.html", form=form)


@app.route("/singup", methods=["GET", "POST"])
def singup():
    form = SignupForm()

    if request.method == "POST":

        user = get_user_by_nickname(form.nickname.data)

        if user:
            flash("This user already exists")
            return redirect("singup")

        password = generate_password_hash(form.password.data)
        user = User(nickname=form.nickname.data, email=form.email.data,
                    password=password)
        add_item_to_db(user)
        return redirect("login")

    return render_template("singup.html", form=form)

@app.route("/get_events_by/<date>", methods=["GET"])
def get_events_by(date):
    data = get_events_for_current_user_by(date, 5)
    response = make_response(data)
    print(data)
    return response.data

@app.route("/login", methods=["GET"])
def login():
    request_data = json.loads(request.data)
    user = get_user_by_nickname(request_data["nickname"])

    if user:
        is_password_correct = check_password_hash(user.password, request_data["password"])

        if is_password_correct:
            token = create_access_token(identity=user.id,
                                        expires_delta=timedelta(days=30))

            response = make_response({"isLogged": True, "token": token})
            response.status_code = 200
            return response

        response = make_response({"isLogged": False})
        response.status_code = 400
        return response

@jwt_required()
def create_event():
    pass
@jwt_required()
def get_events_by(date):
    pass

def get_events_by(date):

    current_user = get_jwt_identity()

    date = datetime.fromisoformat(date).date()

    data = get_events_for_current_user_by(date, current_user)

    response = make_response(data)

    return response