# StopWatch_Webapp

A stopwatch web application consisting of a start/stop button and a history table. Each time stopwatch is started, the application inserts a new row into the history table that records the start time (including the timezone where we started the timer), and the current latitude and longitude. When the stopwatch is stopped, the application will record the time, timezone, latitude, and longitude, as well as the amount of time that has elapsed.
The history table is viewable offline using the WebStorage API
