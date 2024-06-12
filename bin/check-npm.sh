#!/bin/sh

RED='\033[30;31m'
GREEN='\033[0;32m'
NPM_VERSION=$(npm --version)


if npm --version | grep -q '^10.[[:digit:]]*.[[:digit:]]*'; then
  echo "$GREEN npm version correct $NPM_VERSION"
else
  echo ""
  echo ""
  echo ""
  echo "$RED----------------------------------------------------------------"

  i=0;
  while [ $i -le 5 ];
    do echo "$RED|           |                                   |              |";
    i=$((i+1));
  done

  echo "$RED-------------   npm required >= 10 but has $NPM_VERSION   ----------------"

  j=0;
  while [ $j -le 5 ];
    do echo "$RED|           |                                   |              |";
    j=$((j+1));
  done
  echo "$RED----------------------------------------------------------------"
  echo ""
  echo ""
  echo ""
  exit 1
fi


