sniffles
========

A simple node.js app that cleans Google Flu Trends data into a CSV format suitable for [Dash](http://thedash.com)

Quickstart
=====

    # get it from GitHub
    git clone git@github.com:jerryorr/sniffles.git
    cd sniffles

    # Fire it up
    node server

    # United States data only
    curl http://localhost:5000

    # A variety of regions
    curl 'http://localhost:5000?region=United%20States&region=Pennsylvania&region=Maryland'

Usage on Dash
=====

 1. Deploy `sniffles` somewhere that the intewebs can see it (like [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs))
 1. Go to http://thedash.com
 1. Sign up for an account if you don't already have one
 1. Create a new dashboard
 1. Select + > Custom > Custom Chart
 1. Put `http://yourhost.org:5000?region=United%20States&region=Pennsylvania&region=Maryland` in the `Data URL` field.
 1. Gaze in amazement at your beautiful chart.
