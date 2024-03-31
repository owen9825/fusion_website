#!/bin/bash
echo "Before running this, ensure you've installed css min (npm install -g --registry https://registry.npmjs.org/ cssmin)"
echo "Clearing previous contents";
rm styles/minified/*.min.css

echo "Generating new minified files";
for file in styles/*.css
do
    # Get the filename without the path and extension
    filename=$(basename "$file" .css)

    # Generate a hash based on the contents of the CSS file
    hash=$(md5sum "$file" | cut -d' ' -f1 | cut -c1-8)

    # Minify the CSS file and save it with the hash and .min.css extension
    cssmin "$file" > "styles/minified/${filename}.${hash}.min.css"
    echo "Minified $file -> styles/minified/${filename}.${hash}.min.css"
done

echo "CSS minification completed."
