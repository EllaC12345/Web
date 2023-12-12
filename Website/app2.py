from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import json
app= Flask(__name__)


def get_data_from_js_file(js_files):
    data = {}
    for file in js_files:
        with open(file, 'r') as f:
            data[file] = f.read()
    return data

@app.route("/")
def home():
    # Load Json files
    js_files = ['CAGR_data.js', 'CPI_data.js', 'CAGR_volume.js', 'Sector_data.js']
    data = get_data_from_js_file(js_files)

    # Pass the data to the template
    return render_template("index.html",
                           cagr_data=data['CAGR_data.js'],
                           cpi_data=data['CPI_data.js'],
                           cagr_volume_data=data['CAGR_volume.js'],
                           sector_data=data['Sector_data.js'])

if __name__ == "__main__":
    app.run(debug=True)