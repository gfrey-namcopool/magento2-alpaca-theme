#!/bin/bash
set -e

CLEAN_BRANCH_NAME=${CIRCLE_BRANCH//\//-};

JSON=$(cat <<-EOF
{
    "name": "alpaca-components-2-$CLEAN_BRANCH_NAME",
    "version": 2,
    "scope": "snowdog",
    "type": "npm",
    "forwardNpm": true,
    "alias": [
        "$CLEAN_BRANCH_NAME-"
    ]
}
EOF
)

echo $JSON > .now/now.feature.json
