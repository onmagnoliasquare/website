#!/bin/bash

# This script deletes documents on Sanity according to a type. Make sure to run it in the
# packages/backend directory, since that is where the Sanity CLI binary can be run.
# Retrieved from: https://www.sanity.io/schemas/delete-documents-using-sanity-cli-182ef7cd

type=$1
for id in $(sanity documents query "*[_type=='$type'] {_id}" | jq -r '.[] |$
    yarn run -T sanity documents delete "$id"
done
