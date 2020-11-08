## You can replace the 14 with a new version of node.
FROM node:14

# Sets the working directory, ready for further commands
WORKDIR /home/sg/

# If node_modules grows too large, might be worth copying it here for faster builds. 
# Especially when building on windows. However, having node_modules might allow IDE's to improve their intellisense.
# Will see how the project develops.