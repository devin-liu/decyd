Curl Examples.md

curl http://localhost:3001/state



curl http://localhost:3001/txs -d '{"action": "addOption", "option":"Hillary"}'
curl http://localhost:3001/txs -d '{"action": "addOption", "option":"Trump"}'
curl http://localhost:3001/txs -d '{"action": "vote", "option":"Hillary", "id":"0"}'
curl http://localhost:3001/txs -d '{"action": "vote", "option":"Trump", "id":"0"}'


curl http://e5bb239a.ngrok.io/txs -d '{"action": "vote", "option":"Hillary"}'



Election | Who would you vote for today? 

Start with : Trump, Hillary, Bernie

Funding |  Thanks for your donation to Puerto Rico. Where would you like your funds to go?

Have some kind of screen that makes it look like the user made a donation. Then choose 2 NGO’s or initiatives that the donor can choose from

Travel  |  What is your favorite city to visit? 

Start with 2 or 3 cities such as Paris, France;  Tibud, Bali; New York City, USA 

Make it easy for them to add options
