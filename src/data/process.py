import csv, json
from collections import defaultdict

squads = defaultdict(list)
teamsMap = dict()
players = []
with open('./final.csv', newline='') as f:
    reader = csv.DictReader(f)
    for player in reader:
        players.append(player)
        squads[player['team_id']].append(player)
        if player['team_id'] not in teamsMap:
            teamsMap[player['team_id']] = player['team_name']

with open('./squads.json', 'w+') as o:
    json.dump(squads, o)

with open('./teams.json', 'w') as t:
    json.dump(teamsMap, t)

with open('./players.json', 'w') as p:
    json.dump(players, p)

