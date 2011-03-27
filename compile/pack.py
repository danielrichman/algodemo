import re

def replace_key(key):
    return "{" + key + "}"

def protect(key, data):
    if key == "LICENSE":
        return "\n\n\n" + data + "\n\n\n"
    else:
        return " /* <![CDATA[ */ " + data + " /* ]]> */ "

def html_minify(data):
    data = re.sub('\s+', ' ', data)
    return data

sources = {
    "HTML": "algo.html",
    "JQUERY": "compile/jquery-1.5.1.min.js",
    "JAVASCRIPT": "min/algo.js",
    "CSS": "min/algo.css",
    "LICENSE": "LICENSE"
}

output = "min/algo.html"

for (key, filename) in sources.items():
    with open(filename) as f:
        sources[key] = f.read()

html = html_minify(sources["HTML"])
del sources["HTML"]

for (key, data) in sources.items():
    html = html.replace(replace_key(key), protect(key, data))

with open(output, 'w') as f:
    f.write(html)
