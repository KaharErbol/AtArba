In the journals, every day that you work on the project, you must make an entry in your journal after you've finished that day. At a minimum, you will need to include the following information:

The date of the entry:

* A list of features/issues that you worked on and who you worked with, if applicable
* A reflection on any design conversations that you had
* At least one ah-ha! moment that you had during your coding, however small

Keep your journal in reverse chronological order. Always put new entries at the top.
---

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