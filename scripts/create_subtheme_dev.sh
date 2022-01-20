#!/bin/bash
# Script to quickly create sub-theme.

echo '
+------------------------------------------------------------------------+
| With this script you could quickly create bootstrap_sass sub-theme     |
| In order to use this:                                                  |
| - bootstrap_sass theme (this folder) should be in the contrib folder   |
+------------------------------------------------------------------------+
'

CUSTOM_BOOTSTRAP_SASS=$1
CUSTOM_BOOTSTRAP_SASS_NAME=$2

cd build/themes/custom

if [ -d "$CUSTOM_BOOTSTRAP_SASS" ]
then
  echo "sdasd"
    rm -rf "$CUSTOM_BOOTSTRAP_SASS"
fi

cp -r ../contrib/bootstrap_sass $CUSTOM_BOOTSTRAP_SASS
cd $CUSTOM_BOOTSTRAP_SASS
for file in *bootstrap_sass.*; do mv $file ${file//bootstrap_sass/$CUSTOM_BOOTSTRAP_SASS}; done
for file in config/*/*bootstrap_sass.*; do mv $file ${file//bootstrap_sass/$CUSTOM_BOOTSTRAP_SASS}; done

# mv {_,}$CUSTOM_BOOTSTRAP_SASS.theme
grep -Rl bootstrap_sass .|xargs sed -i -e "s/bootstrap_sass/$CUSTOM_BOOTSTRAP_SASS/"
sed -i -e "s/SASS Bootstrap Starter Kit Subtheme/$CUSTOM_BOOTSTRAP_SASS_NAME/" $CUSTOM_BOOTSTRAP_SASS.info.yml
echo "# Check the themes/custom folder for your new sub-theme."

# Replace the gulp file and templates.
cp ../../custom/upchuk_theme/gulpfile.js .
cp -r ../../custom/upchuk_theme/templates/* templates

rm "composer.json"
