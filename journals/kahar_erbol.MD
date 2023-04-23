In the journals, every day that you work on the project, you must make an entry in your journal after you've finished that day. At a minimum, you will need to include the following information:

The date of the entry:

* A list of features/issues that you worked on and who you worked with, if applicable
* A reflection on any design conversations that you had
* At least one ah-ha! moment that you had during your coding, however small

Keep your journal in reverse chronological order. Always put new entries at the top.
---
## Apr 20, 2023
* Added unique to username in users table, so the creation of users based on username will not be duplicated
* In try_get_account_data, added the try word, so it can raise Exception when creating an item, for delete just add the get_account_data to protect the endpoints.
* Installed the `npm install @galvanize-inc/jwtdown-for-react`


## Apr 13, 2023


## Apr 11, 2023
* Found the issue causing the bad request (400) when creating an item
PostgreSQL smallint , int , bigint and oid are converted to Python int . PostgreSQL real and double are converted to Python float . PostgreSQL numeric is converted to Python Decimal.
* Changed the data type in migration file, will rebuild the docker-compose again
* Still got the bad request 400, but data passed into database, the problem could be something else, I decided to go on
* solved the bad request problem, the response.state = 400, not response.statue_code = 200


## Apr 3, 2023
* added users and status tables
* fixed the problem - ModuleNotFoundError: No module named 'jwtdown_fastapi'
* In order to install jwtdown-fasapi 0.5.0, th efastapi must be higher version.
* I generated a random sign-in key, put it in the docker-compose.yml

## Apr 1, 2023
* I wrote Fast Api for get, post, put, delete
* I added response status in case there is error 
Now the items table has a full restful api to interact with, using fast api can be interesting, because I can write SQL to do what I want with the database. One thing I noticed, it's little tricky to add a foreign key, for now I think I can use table joins if I need any foreign key like operation.


## Mar 31, 2023
* Created a table in db
* I wrote code for pydantic models 
It's tricky if I set category type as Category class, may be it's abetter practice to utilize SQL joins to get some data, or create some tables.


## Mar 30, 2023
* I created migrations file -> 001_create_my_table.py
* I ran a migration

I think a table for Categories are needed.

## Mar 29, 2023
Today, I worked on:

* Start write Gitlab Issues

* Designing database tables
I wrote some SQL. Created three tables, should be enough for MVP.
Today, I realized I might need a table for item states (listed, sold, unlisted) which is the third the table.

* Something to ask during interviews
Does the team use a linter to enforce a common style?

* Installed black
A good way to make sure the code looks the same for the entire team is to use a "linter" to format the code for you. You had to do this for the Module 1 project.

Install **black** globally on your computer.
`python -m pip install black`

Then, before you `git add` your Python code, run **black** on the directories that you have Python code in.

```
# This command will format all of the .py files
# in the customer-api and weather-data directories
black customer-api weather-data
```

* Stand-ups
    - What have you done since the last stand-up?
    - What do you plan on doing next?
    - Is there anything preventing you from doing what you want to do (a.k.a., do you have any  
      blockers)?

The answer to the last question can be involved. If you do have a blocker, try approaching it in this format:
    - Describe the obstacle that you're facing
    - Express if you would like someone to work with you ("pair" with you) for a little while to   
    help you overcome the obstacle

* Quickstart: Collaborative coding with Visual Studio Live Share
https://learn.microsoft.com/en-us/visualstudio/liveshare/quickstart/share

Pairing does not mean two people typing at once. Instead, there are two roles, the driver and the navigator:
    - The driver writes code
    - The navigator reviews each line of code as it's typed in
    - You frequently switch roles