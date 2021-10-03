def getTabs(list):
    tabsList = []
    for x in list:
        tabs = "."
        for y in range(x.count('    ')):
            tabs += '\\u00a0'
        tabsList.append(tabs)
    return tabsList

lines = list(open("a.py", "r"))
print(getTabs(list(lines)))
f = open("archivo.txt", "a")
f.write('=,=br=,=code>>'.join([''.join(tups) for tups in zip(getTabs(list(lines)), map(lambda x: x.rstrip("\n").replace("\"","\\"+"\""),lines))]))
f.close()

