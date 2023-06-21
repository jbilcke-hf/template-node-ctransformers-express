# pick your favorite Python + Node bundle from here:
# https://hub.docker.com/r/nikolaik/python-nodejs
FROM nikolaik/python-nodejs:python3.11-nodejs18

RUN apt-get update
RUN apt-get install -y libc6

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# if no binary is available for your env, use --no-binary
# RUN pip install ctransformers --no-binary ctransformers

# or if you want to enable GPU with CUDA:
# RUN CT_CUBLAS=1 pip install ctransformers --no-binary ctransformers

# Set up a new user named "user" with user ID 1000
RUN useradd -o -u 1000 user

# Switch to the "user" user
USER user

# Set home to the user's home directory
ENV HOME=/home/user \
	PATH=/home/user/.local/bin:$PATH

# Set the working directory to the user's home directory
WORKDIR $HOME/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=user package*.json $HOME/app

RUN npm install


# Copy the current directory contents into the container at $HOME/app setting the owner to the user
COPY --chown=user . $HOME/app

EXPOSE 7860
CMD [ "npm", "run", "start" ]