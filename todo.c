#include <unistd.h>
#include <sys/wait.h>

int main() {
    char* cmd1[] = {(char*) "node", (char*) "server.js", NULL};
    char* cmd2[] = {(char*) "npm", (char*) "run", (char*) "dev", NULL};

    pid_t pid = fork();
    if (pid == 0) { // child
        execvp(cmd1[0], cmd1);
    }

    execvp(cmd2[0], cmd2);
    int* status;
    wait(status);
}
