Curl Examples.md

curl http://localhost:3001/state



curl http://localhost:3001/txs -d '{"action": "addOption", "option":"Hillary"}'
curl http://localhost:3001/txs -d '{"action": "addOption", "option":"Trump"}'
curl http://localhost:3001/txs -d '{"action": "vote", "option":"Hillary"}'
curl http://localhost:3001/txs -d '{"action": "vote", "option":"Trump"}'


curl http://e5bb239a.ngrok.io/txs -d '{"action": "vote", "option":"Hillary"}'
