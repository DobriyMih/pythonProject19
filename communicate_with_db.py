import datetime
import json

from sqlalchemy.orm import Session
from .database import User, engine, Event

session = Session(engine)


def get_user_by_nickname(value: str):
    user = session.query(User).where(User.nickname == value).first()
    return user

def add_item_to_db(obj):
    session.add(obj)
    session.commit()

def create_json_from(object):
    event_dict = object.__dict__

    event_dict.pop('_sa_instance_state', None)

    event_dict['time'] = event_dict['time'].strftime('%H:%M')
    event_dict['date'] = event_dict['date'].strftime('%Y-%m-%d')

    json_string = json.dumps(event_dict)
    return json_string

def get_events_for_current_user_by(date: datetime.date, user: int):

    events = session.query(Event).filter(Event.date == date, Event.user ==
user).all()
    print(events)
    jsonified_events = []
    for event in events:
        jsonified_events.append(create_json_from(event))
    return jsonified_events