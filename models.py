#!/usr/bin/env python
# -*- coding: utf-8 -*-

from google.appengine.ext import ndb

class Game(ndb.Model):
	TRACK_AIMY = 0
	TRACK_JAR_EL = 1
	
	STATE_IDLE = 0
	STATE_FIRST = 1 # First room
	STATE_FINAL = 2 # Final room
	STATE_VICTORY = 3
	
	track = ndb.IntegerProperty()
	state = ndb.IntegerProperty()
	start_time = ndb.IntegerProperty() # Timestamp
