#!/usr/bin/env python
# -*- coding: utf-8 -*-

from google.appengine.ext import ndb

class Game(ndb.Model):
	TRACK_AIMY = 0
	TRACK_JAR_EL = 1
	TRACK_STARFEST = 2
	
	STATE_IDLE = 0
	STATE_FIRST = 1 # First room
	STATE_FINAL = 2 # Final room
	STATE_FAILURE = 3
	STATE_VICTORY = 4
	
	track = ndb.IntegerProperty()
	state = ndb.IntegerProperty()
	start_time = ndb.IntegerProperty() # Timestamp
