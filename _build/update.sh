sh build.sh
sh build_testBundle.sh

echo "Copying resources to _TEMPLATE/"
cp -f ../bin/ku4js-webApp-testBundle.js "../_TEMPLATE/-projectName-/tests/_dependencies/"

echo "Copying resources to example/"
cp -f ../bin/ku4js-webApp.js ../_example/javascript/lib/
cp -f ../bin/ku4js-webApp-testBundle.js ../_example/javascript/example/tests/_dependencies/

echo "Update complete :{)}"