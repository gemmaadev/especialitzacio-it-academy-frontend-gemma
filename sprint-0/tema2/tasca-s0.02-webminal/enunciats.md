### **INSTRUCCIONS WEBMINAL**  [**https://www.webminal.org/terminal/**](https://www.webminal.org/terminal/) 

###  **Lesson1 \- Basic commands to navigate directories**

Simply type  
$ pwd

and press enter key and read on :) title: pwd  
Can you see the output similar to */home/yourname* ? cool,you have found your current working directory.Congrats,You have joined exclusive club of linux commandline users :)  
As you realized typing  
pwd

will display your current working directory.Yeah,your home is a directory. Now lets try to create a new directory.type the following on the prompt  
mkdir \-v dir1

and press enter key. title: mkdir  
Did it say?  
*mkdir: created directory dir1*  
Wow,now you created a new directory. Lets say you want to create more than one directory instead of invoking mkdir multiple(three) times-like.  
mkdir \-v dir2  
mkdir \-v dir2/dir3  
mkdir \-v dir2/dir3/dir4

you can simply use  
mkdir \-vp dir2/dir3/dir4

"-p" option will create parent directories for "dir4" as needed. In this case,it creates dir2,dir3 automatically.Now we have created 4 directories.How to view them?  
To view type 'ls' and press enter  
ls

title: ls  
listed dir1 dir2 as directory content right? Thats exactly what we wanted  
\`dumb tutor: yes,the guy with blue-t-shirt,  
       Yeah, you ,why you look so confused?\`  
\`blue-t-shirt:I created 4 directories,  
               where is the missing dir3,dir4?\`

Good question.They are created inside dir2 they won't be listed with simple command like ls.you need to use "complex" command to view them. Try this:  
ls \-R

really "complex" isn't it :P ,btw \-R stands for recursive.  
Okay,we have created a new directories and listed them.Now lets move into a new directory.  
cd dir2

title: cd  
cool,you have changed to dir2 Now confirm this location by using previously learned pwd command.To move into next directory dir3  
cd dir3

will place you under "dir3" directory.

Tips and tricks: Typing

   cd ..

will move to parent directory.i.e dir2. Now type,  
cd \-

will move you to previous working directory i.e dir3 Cool ,isn't it? and a simple  
cd

will move to the your home directory.  
That's it.You have successfully completed lesson1 Now to start next lesson.

### **Lesson2 \- Create files, display contents and stats**

### During Lesson1,you have learned how to create directories.

### Lets learn to create a new file, **touch file1.txt** and press enter key and read on :)

### title: touch

### touch command will create a new file or change time stamp of an existing file. Now try again, **touch  file1.txt**

### this time it will change file1.txt created/last access and modified time to current time. **touch file2.txt**

### will create an empty new file ,if the file is not already exists. to view directory contents ,you can also use **dir**

### title: dir

### **dir** is used to list directory contents.Yeah,as you guessed it correctly , **dir** is equivalent to **ls \-C \-b** 

### that is, by default files are listed in columns, sorted vertically, and special characters are represented by backslash escape sequences. To clear a screen,the command is

### **clear**

### title: clear

### Viola\! terminal screen is cleared\!\!\! Lets print some message on the terminal, **echo "hello"**

### title: echo

### Cool\! the message is displayed on the screen. Lets redirect the message to a new file instead of screen. **echo "hello" \> hello.txt**

### To append data you must use \>\> not just \> **echo "linux" \>\> hello.txt**  **echo "world" \>\> hello.txt**

### Done.To view the file content ,do **cat hello.txt**

### title: cat

### so now you have viewed the file content.cat is used to display the entire file content.

### To view only first two lines from the file **head \-2 hello.txt**

### title: head

### see,it showed us first two lines from files. By default,head will display the first 10 lines when you run, **head hello.txt**

### Now how to view last two lines?.Its simple,use **tail** **tail \-2 hello.txt**

### title: tail

### cool. Thus head will be used to display lines from begining and tail will be used to display last few lines. As with head **tail hello.txt**

### by default will display last 10 lines from the line.

### Lets check some stats of the files and directories we have create so far. **stat hello.txt**

### title: stat

### carefully examine few important fields the output. The first line shows the filename.second line says its a regular file with size as 18.Third line shows Inode number and no.of links to that inode.

### Fourth one,says owner(Uid),group(Gid) who has read-write permission but other have read permission.Final three lines show access,modified and change time.They mean: **access \- when the file was last accessed/read.**

### **modified \- when the contents was last** 

### **modified written.**

### **change \- denotes changes to files metadata**

### **like changing user permission.**

### Now lets do a stat on directory.

### **stat dir1**

### Compare the previous stat "hello.txt" output with "dir1",before you move. especially find out "dir1" type.That marks the end of lesson2\!. Well done.

### **Lesson3 \- Copy,rename,delete files**

On Lesson1,you learned about directories. With Lesson2,you learned about files. Now lets learn general file operations.  
Now check this command  
du  
title: du  
it displays the disk usage of current directory.(Please note the current total of du output).Use the h switch to output in a human readable format and the x switch to exclude other file systems and \~ denotes your home.  
du \-xh \~

Tips and tricks:

du can take a long time so you can specify the max.directory depth using "--max-depth" option.  
du \--max-depth 3 \~

Now lets copy hello.txt to dir2 directory.  
cp \-v hello.txt dir2

title: cp  
now file is copied to new location.Now compute the usage again using, du now you should see usage has been increased by file size.

Tips and tricks:

cp \-v hello.txt dir2/file2.txt

This will copy hello.txt into dir2 at the same time, rename it as "file2.txt".  
cp  \-vr dir2/\*.txt dir2/dir3

This will copy all files ending with ".txt" from dir2 into dir2/dir3.  
cp \-vr dir2/dir3  .

This will copy the directory named "dir3" to current directory.  
Use ls,it should show you dir3.  
now we have copied few files,how do we verify its file integrity?simple cat should be enough.But If its large file or binary file,we can't use cat.We have to use,  
md5sum hello.txt

title: md5sum  
b8d5079c5d6a9dbb3294b31d318d74c0 is the calculated checksum for a file.This helps with detecting accidental or deliberate file corruption.  
When transfering a file from machine to another or downloading files from internet,to verify the file integrity compare md5sum on source and destination machines,  
md5sum dir2/hello.txt

should be same as  
md5sum hello.txt

now lets move to another command,  
mv hello.txt dir2/dir3/dir4/hi.txt

title: mv  
will move a file into directory dir4 and names it as hi.txt. so how mv is different from cp?.Try ls it will not show hello.txt.  
When you use cp there exists two copies of a file (similar to copy-paste "ctrl-c" and "ctrl-v") with mv there is one copy (its cut-paste ctrl-x and ctrl-v). unlike (cp,rm) other commands mv don't need "-r" for directories.  
create a new directory dir5  
mkdir dir5

now  
mv dir2/\*.txt dir5  
mv dir5  dir50

will move all "\*.txt" files under dir2 into dir5. then rename the directory "dir5" as "dir50".  
with mv command we moved hello.txt under dir4,instead of accessing them as dir2/dir3/dir4/hi.txt everytime,we can create a link and after that,you can access or edit dir2/dir3/dir4/hi.txt file as simply hello  
ln  dir2/dir3/dir4/hi.txt hello

title: ln  
Great\! you have created a link. There are two types of links, hardlinks. where a same inode pointed by two different names and softlinks which work more like shortcuts.  
Hard links are created by default.  
stat hello

and perform  
stat dir2/dir3/dir4/hi.txt

see both uses same inode and link count shown as 2\. Soft links are created using the s switch.  
ln \-s  dir2/dir3/dir4/hi.txt  softlink

again do  
stat softlink

and examine its output.New inode is created for this new symbolic link "softlink" but link count remains as 1\. To remove individual file use  
rm \-i file2.txt

title: rm  
will prompt you with a message.rm: remove regular empty file 'file2.txt'? type y to delete the file.To remove directory, first remove it's contents using option "r",  
rm \-ri dir50/\*

Tips and tricks:

If you want to remove files content without begin prompted for confirmation use \-f option. It's extremely dangerous to use "rm \-rf",because you may delete very important files by mistake-so make sure you delete correct files before running rm \-rf"  
rm \-rf junk/\*  
rmdir  dir50

rmdir will remove an empty directory. so thats end of lesson3. Good keep going :) Time for lesson4.

### **Lesson4 \- Basic process commands**

On Lesson1,you learned about directories. With Lesson2,you learned about files. With Lesson3,you have learned about Copying,renaming,deleting files. Now lets learn basic process-related commands.  
Now check this widely used  
ps  
title: ps  
output is nothing but a snapshot of the currently running processes. lets create a new process.  
sleep 60 &

title: ps  
can you see process id on screen?Now again do  
ps  
you can see the sleeping process,now-right? lets see how to stop/kill this process replace 12345 will your sleeping process id,you got above  
kill 12345  
title: kill  
Check again the running process list with  
ps  
sleeping process is Gone\! right?  
kill 12345

Tips and tricks:

Sometimes process won't die with simple kill command,in such cases scream die\!die\!die\! while running kill command.(hehe..just kidding) you have to use "-9" option.  
kill \-9 12345  
start two process like  
sleep 30 &  
sleep 30 &  
checking with "ps",we can see we have two process named sleep,now type  
killall sleep  
title: killall  
did it gave an output like  
Terminated sleep 30  
right?thus killall terminates processes by process name.

Tips and tricks:

killall \-u webminal  
This kills only processes owned by user "webminal"  
killall \-w find

Wait for all find process to die. killall checks once per second if any of the killed processes still exist and only returns if none are left. Note that killall may wait forever if the signal was ignored, had no effect. To find a process id (pid) of a process you can use,  
pidof bash  
title: pidof  
provides the process ID of a running program bash

Tips and tricks:

pidof \-s bash  
returns only one process id , instead of all process running as bash You can adjust the pripority of your process by starting a process like,  
nice \-n 19 sleep 30 &  
title: nice  
runs a program with modified scheduling priority. Nice runs a command with an adjusted niceness, which affects process scheduling.Nicenesses range from \-20 (most favorable scheduling) to 19 (least favorable-the affected processes will run only when nothing else in the system wants to).Only root can increase the priority ,for example setting process nice to \-20 others can lower the priority of processes they own.  
how to adjust priority of currently running process with pid 12345?  
renice \-n 19 12345  
title: renice  
changes priority of running processes.  
renice \+1 3176  
3176: old priority 0, new priority 1

renice \+4 3176  
3176: old priority 1, new priority 4  
Only root can increase the priority ,for example setting process nice to \-20.others can lower the priority of processes they own.  
note with renice command,Non super-users can not increase scheduling priorities of their own processes,even if they were the ones that decreased the priorities in the first place.  
To adjust priority for all process owned by a user "webminal",  
renice \+1 \-u webminal  
to display running process ,you can also use  
top  
title: top  
see it provides a dynamic real-time view of a running system. spend sometime ,examining the output.To quit from the top command,press q. To display commands in a tree like structure,type  
pstree

title: pstree  
display a tree of processes,to display pid , use \-p option with pstree.  
pstree \-p  
below command will let us know how long it took to complete a command.  
time ls \-l  
title: time  
time gives statistics about the program it ran.  
real \- the elapsed real time between invocation and termination.  
user \- the user CPU time .  
sys \- the system CPU time .  
Thanks,you have completed Lesson4.  
