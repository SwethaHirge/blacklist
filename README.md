# blacklist
Blacklist Module
Introduction
This module provides the functionalities to blacklist a number to prevent the sending of SMS to that number. The data is stored in a MongoDB database using Mongoose. The module defines four functions:

Blacklist: This function is used to blacklist a number by creating a record in the database.
BlacklistExist: This function checks if a number is already blacklisted or not.
isBlacklisted: This function returns true if the number is blacklisted otherwise false.
updateIsBlacklisted: This function updates the blacklist status of a number.
Usage
Prerequisites
MongoDB installed and running
Mongoose installed
Installation

npm install

Importing the module

const blacklist = require('path/to/blacklistModule');

Function Descriptions
Blacklist(number)
This function accepts a number as an argument and creates a record of that number in the database with isBlocked set to true.

Input
number: The number to be blacklisted.

Output
Returns true if the number is blacklisted successfully otherwise false.

BlacklistExist(number)
This function accepts a number as an argument and returns true if the number is already blacklisted otherwise false.

Input
number: The number to check for blacklist.

Output
Returns true if the number is blacklisted otherwise false.
isBlacklisted(number)

This function accepts a number as an argument and returns true if the number is blacklisted with isBlocked set to true, otherwise false.

Input
number: The number to check for blacklist.

Output
Returns true if the number is blacklisted otherwise false.

updateIsBlacklisted(number)
This function accepts a number as an argument and updates the isBlocked status of the number in the database. If the number was blacklisted, it unblocks the number and if the number was unblocked, it blocks the number.

Input
number: The number to update the blacklist status.

Output
Returns true if the update is successful otherwise false.

Blacklist Model
Introduction
This is the database model for the blacklisting feature. It uses MongoDB and Mongoose to store the data. The model defines two fields:

number: The phone number to be blacklisted.
isBlocked: A boolean field to store the blacklist status of the number.
Usage

Importing the module

const blacklistModel = require('path/to/blacklistModel');

Fields Descriptions
number: The number field is of string type and it is required.
isBlocked: The isBlocked field is of boolean type and its default value is true