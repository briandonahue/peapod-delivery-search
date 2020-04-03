# Peapod Delivery Window Finder

This is a hacked together script to find delivery windows via Peapod, which delivers groceries from the Giant grocery store chain.

In it's current form, it is only really useable by people comfortable with some minor coding and command line usage. With some work, it could be improved to automate the manual steps, but it would likely involve some web scripting and scraping that is not worth it for my use current minimal usage.

## Background

Giant lets you reserve a grocery delivery time slot in advance, and then you can edit your order up until a few hours before your delivery. This can be easier than using something like PrimeNow grocery delivery where you have to keep refreshing the page to see if new windows have opened up and grab one quick (meanwhile items in your cart can become out of stock and be removed).  

This script will, by default, look at the next 10 days and tell you what windows, if any, are available. **Delivery windows are opened all the time, so run it multiple times. The annoying catch is that you will need to replace your session cookie if you wait too long between runs.**

## Steps to query for delivery times

1. **Go to [Peapod](https://peapod.com).** You can log in if you have an account (a good idea if you are going to order) but you don't have to. If not logged in, you will need to find your local store following the prompts on the home page. 
2. **Grab your cookie** This is the hackiest part. Here's how I do it:
  1. Open Chrome DevTools
  2. Go to the Network tab, refresh the page
  3. Click on any of the XHR requests, I usually look for the `log` ones as they are easy to spot. 
  4. Go to the **Headers** tab of the request, and copy the `cookie: ` value (only the value).
3. Paste the cookie value all on one line with no extra line breaks into a file in the root named `.cookie`
4. **Optional:** Change the number in the for loop to how many days you want to search, default is 10 - yes I could make this a command line arg, maybe I will eventually but if you're in a hurry, I take PRs!
5. Run `node ./index.js` and enjoy.  
6. If you see an available window, go back to the website and click "Reserve a Time" quickly! 

**Note:** *In my experience, you'll want to put some items in your cart and checkout, otherwise you can lose the time - but you can change your order up to a few hours before your delivery*

## Suggested Improvements



### Disclaimer

I am only posting this in case it's useful to others while it is hard to get grocery delivery during the coronavirus isolation. It is suepr hacky and I make no guarantees that it works or is even legal... it worked for me!
