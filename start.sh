#!/bin/bash

if [ $1 -eq 1 ]
then
    cp .env.development .env

elif [ $1 -eq 2 ]
then
    cp .env.deployment .env

fi

npm run dev