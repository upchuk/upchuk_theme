#!/bin/bash
# Script to quickly create sub-theme.

echo '
+------------------------------------------------------------------------+
| With this script you could quickly create bootstrap_sass sub-theme     |
| In order to use this:                                                  |
| - bootstrap_sass theme (this folder) should be in the contrib folder   |
+------------------------------------------------------------------------+
'
echo 'The machine name of your custom theme? [e.g. mycustom_bootstrap_sass]'
read CUSTOM_BOOTSTRAP_SASS

echo 'Your theme name ? [e.g. My custom bootstrap_sass]'
read CUSTOM_BOOTSTRAP_SASS_NAME

if [[ ! -e ../../custom ]]; then
    mkdir ../../custom
fi
cd ../../custom
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
cp -r ../../custom/upchuk_theme/templates .

# Remove extra files.
rm "$CUSTOM_BOOTSTRAP_SASS.info.yml-e"
rm "$CUSTOM_BOOTSTRAP_SASS.theme-e"
rm "js/custom.js-e"
rm "composer.json-e"
rm "composer.json"
