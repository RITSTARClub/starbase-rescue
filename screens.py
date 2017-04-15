#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
from time import time

import jinja2
import webapp2

from google.appengine.api import channel

from models import Game

JINJA_ENVIRONMENT = jinja2.Environment(
	loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates/')),
	extensions=['jinja2.ext.autoescape'],
	autoescape=True)

PAGES = {
	'jarel': [
		'admin',
		'progress',
		'sudoku',
		'lightsout'
	],
	'aimy': [
		'admin',
		'progress',
		'rebus',
		'sundial'
	],
	'starfest': [
		'admin',
		'progress',
		'sudoku'
	]
}


class APIHandler(webapp2.RequestHandler):
	def get(self, query):
		track = int(self.request.get('track'))
		new_state = int(self.request.get('new_state'))
		
		game = Game.query(Game.track == track).get()
		if new_state == Game.STATE_FIRST:
			if not game:
				game = Game()
				game.track = track
			game.start_time = int(time())
		
		game.state = new_state
		game.put()
		
		if track == Game.TRACK_AIMY:
			for page in PAGES['aimy']:
				channel.send_message('aimy-' + page, '{"state": ' + `new_state` + ',"startTime":' + `game.start_time` + '}')
		elif track == Game.TRACK_JAR_EL:
			for page in PAGES['jarel']:
				channel.send_message('jarel-' + page, '{"state": ' + `new_state` + ',"startTime":' + `game.start_time` + '}')
		elif track == Game.TRACK_STARFEST:
			for page in PAGES['starfest']:
				channel.send_message('starfest-' + page, '{"state": ' + `new_state` + ',"startTime":' + `game.start_time` + '}')

class JarElPage(webapp2.RequestHandler):
	def get(self, page):
		game = Game.query(Game.track == Game.TRACK_JAR_EL).get()
		if (not game) and (page == 'admin'):
			game = Game()
		
		template = JINJA_ENVIRONMENT.get_template('jarel/' + page + '.html')
		self.response.write(template.render({
			'token': channel.create_channel('jarel-' + page),
			'track': Game.TRACK_JAR_EL,
			'state': game.state,
			'start_time': game.start_time
		}))

class AIMYPage(webapp2.RequestHandler):
	def get(self, page):
		game = Game.query(Game.track == Game.TRACK_AIMY).get()
		if (not game) and (page == 'admin'):
			game = Game()
		
		token = channel.create_channel('aimy-' + page)
		
		template = JINJA_ENVIRONMENT.get_template('aimy/' + page + '.html')
		self.response.write(template.render({
			'token': channel.create_channel('aimy-' + page),
			'track': Game.TRACK_AIMY,
			'state': game.state,
			'start_time': game.start_time
		}))

class STARfestPage(webapp2.RequestHandler):
	def get(self, page):
		game = Game.query(Game.track == Game.TRACK_STARFEST).get()
		if (not game) and (page == 'admin'):
			game = Game()
		
		token = channel.create_channel('starfest-' + page)
		
		template = JINJA_ENVIRONMENT.get_template('starfest/' + page + '.html')
		self.response.write(template.render({
			'token': channel.create_channel('starfest-' + page),
			'track': Game.TRACK_STARFEST,
			'state': game.state,
			'start_time': game.start_time
		}))

class AdminPage(webapp2.RequestHandler):
	def get(self):
		template = JINJA_ENVIRONMENT.get_template('admin.html')
		self.response.write(template.render({}))

class HubPage(webapp2.RequestHandler):
	def get(self, page):
		template = JINJA_ENVIRONMENT.get_template('hub.html')
		self.response.write(template.render({}))

app = webapp2.WSGIApplication([
	('/api(.*)', APIHandler),
	('/jarel/(.*)', JarElPage),
	('/aimy/(.*)', AIMYPage),
	('/starfest/(.*)', STARfestPage),
	('/(.*)', HubPage)
])
