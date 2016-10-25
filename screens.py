#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

import jinja2
import webapp2

from google.appengine.api import channel

JINJA_ENVIRONMENT = jinja2.Environment(
	loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates/')),
	extensions=['jinja2.ext.autoescape'],
	autoescape=True)


class JarElPage(webapp2.RequestHandler):
	def get(self, page):
		template = JINJA_ENVIRONMENT.get_template(page + '.html')
		self.response.write(template.render({}))

class AIMYPage(webapp2.RequestHandler):
	def get(self, page):
		template = JINJA_ENVIRONMENT.get_template(page + '.html')
		self.response.write(template.render({}))

class AdminPage(webapp2.RequestHandler):
	def get(self):
		template = JINJA_ENVIRONMENT.get_template('admin.html')
		self.response.write(template.render({}))

class HubPage(webapp2.RequestHandler):
	def get(self, page):
		template = JINJA_ENVIRONMENT.get_template('hub.html')
		self.response.write(template.render({}))

app = webapp2.WSGIApplication([
	('/jarel/(.*)', JarElPage),
	('/aimy/(.*)', AIMYPage),
	('/admin', AdminPage),
	('/(.*)', HubPage)
])
