#!/usr/bin/env bash

# DESC: Checks if a package is already published
# ARGS: $1: A package name
#       $2: A package scope
# OUTS: A report with the status of the package to console and to report file
function is_pkg_published() {

    project=$(echo "$1" | xargs)      # The name of the package as it is in angular.json.Ex: cdk
    # scope=$(echo "$2" | xargs)
    # prefix=$(echo "$3" | xargs)         # The prefix as it is in angular.json followed by a dash.

    published="false"

    if [[ $project == "" ]]; then
        echo "ERROR: Package name can't be empty"
        return 1
    fi


    # Check in projects directory because the package hasn't been built yet. It should have the same scope as in the repo.
    local_version=$(cat projects/$project/package.json | jq -r ".version")
    local_name=$(cat projects/$project/package.json | jq -r ".name")
   
    # Check if already published
    repo_versions=$(yarn -s info $local_name time --json 2> /dev/null | jq '.data | keys')

    if [[ $repo_versions == *\"$local_version\"*  ]]; then

        published="true"

    fi

    echo "$local_name@$local_version $published"

}

is_pkg_published "$@"