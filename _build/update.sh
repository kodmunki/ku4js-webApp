sh build.sh
sh build_testBundle.sh

echo "Copying resources to _TEMPLATE/"
cp -f ../bin/ku4js-webApp-testBundle.js "../_TEMPLATE/tests/_dependencies/"

echo "Copying resources to example/"
cp -f ../bin/ku4js-webApp.js ../_example/javascript/lib/
cp -f ../bin/ku4js-webApp-testBundle.js ../_example/javascript/tests/_dependencies/

echo "Copying resources to _LATEST/"
cp -f ../bin/ku4js-webApp.js ../../_LATEST/
cp -f ../bin/ku4js-webApp-testBundle.js ../../_LATEST/

echo "Update complete :{)}"