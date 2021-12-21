# maika-sh-js-model

To add submodule model

delete src/models

git add src/models\*

git commit -m "- Delete local model"

git submodule add https://github.com/olli-ai/maika-sh-js-model.git src/models

git commit -m "- Add submodule model"

To clone submodule in main repo

git clone --recursive git@github.com:olli-ai/maika-sh-js-model.git src/models

################# REMOVE ###############
git submodule deinit -f .\src\models\
rm -Force .\.git\modules\src\models\
git rm -f path/to/submodule
git rm -f .\src\models\
git add .
git commit -m "- Remove local submodule"
git push
