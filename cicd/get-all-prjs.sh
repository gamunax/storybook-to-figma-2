#!/usr/bin/env bash

angularfile="angular.json"

# DESC: Retrives the lists of libraries from the angular.json file.
# ARGS: None
# OUTS: An error if there aren't any libraries.
function get_libraries() {

    # Gets the list of packages with projectType equal to library.
    packages=$(cat $angularfile | jq -r '.projects[] | select(.projectType == "library").root' | sed 's/projects\///g')

    if [[ -z $packages  ]]; then
        echo "ERROR: There aren't any \"library\" type packages"

        # Creates a new report file with the error
        # echo "Messages" > $report_file
        # echo "ERROR: There aren't any \"library\" type packages." >> $report_file
        exit 1

    fi

    # Replace newline characters with commas and remove the trailing comma
    echo "$packages" | tr '\n' ',' | sed 's/,$//'

}

get_libraries
