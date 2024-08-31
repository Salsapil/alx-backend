#!/usr/bin/env python3
"""This script configures a Flask application with Babel.
The underscore function `_` is used within the Jinja2
Functions:
    _ -- A shortcut for `gettext` function,
    used to look up the translation of a message ID.
"""

from flask import Flask, render_template, request
from flask_babel import Babel, _


class Config:
    """ Config class """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
app.url_map.strict_slashes = False

babel = Babel(app)


@babel.localeselector
def get_locale():
    """ return best match """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index():
    """ default route """
    return render_template('3-index.html')


if __name__ == "__main__":
    app.run(debug=True)
