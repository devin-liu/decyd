Curl Examples.md

curl http://localhost:3001/state



curl http://localhost:3001/txs -d '{"action": "addOption", "option":"Hillary"}'
curl http://localhost:3001/txs -d '{"action": "addOption", "option":"Trump"}'
curl http://localhost:3001/txs -d '{"action": "vote", "option":"Hillary", "id":"0"}'
curl http://localhost:3001/txs -d '{"action": "vote", "option":"Trump", "id":"0"}'


curl http://e5bb239a.ngrok.io/txs -d '{"action": "vote", "option":"Hillary"}'
