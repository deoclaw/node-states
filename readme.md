# States RESTful API in Node

A RESTful API created in Node with Express and MongoDB for a final project using US state data.

Deployed [on Render](https://node-states.onrender.com)

## Challenges

This go around was slightly easier than the PHP midterm project as I had a sense for how the automated tests worked.

### Set-Up Hell

This was not exactly hell. Installing the latest version of node was a difficulty on linux because I was pulling the binaries down but I just had to move them in the right place and set my path. I had already done this earlier in the semester to work on an Astro project.

There was an issue with communicating to the database and running a server, however, with my router's firewall settings.

### Middleware

The middleware kicked my ass. Rather than put it in the main `server.js` file, it apparently had to be put above the specific GET routes wanting single states ala `router.use("/:stateCode", verifyStates);`

I guess I just wish that the documentation had more use case examples. It is hard to visualize what or how to use something, and the tutorial videos felt a little more like reiterating over what was in the docs versus how that can then be applied. But also admittedly I did all of this last minute because of work so you know...

### I hate CORS

There I said it. Thankfully, I remembered reading in Blackboard about watch for CORS and whitelists breaking the auto tests. That was at least an easy fix.

### Started from the DB Now We're Here

Setting up MongoDB was a little frustrating because of how the site had changed things. This also goes into the issue I had with my router settings -- didn't help much. Did not realize that adding facts from MongoDB would mess up my requests in the automated test.

### Passing the Automated Tests Was Painful Part 2: Electric Boogaloo

There are tests that I am still not passing but that are returning the info as asked. I did have an issue with a backtick and a quotation mark on top of each other that I resolved. Still, I failed tests in `PATCH` that returned what was requested in Thunder Client. For example:

> /states/KS/funfact endpoint PATCH request will return a message saying 'No Fun Fact found at that index for Kansas' if no fun fact exists to update at the provided index.
> That test fails but I still get the following:

```
{"message": "No Fun Fact found at that index for Kansas"}
```

My code reads:

```
return res.json({
			message: `No Fun Fact found at that index for ${singleState[0].state}`,
		});
```

What's weird is it works for `DELETE`.

#### Hosts and Tests

Additionally, I found that when using glitch to test, I passed 63 tests and failed 7. When using render to test, I passed 64 and failed 6. Also with glitch, I got the bonus point. With render, I did not. It makes no sense and is frustrating because I cannot troubleshoot what went wrong. I won't die if I'm not right all the time, it is merely frustrating not being able to understand why it doesn't work/works sometimes.
