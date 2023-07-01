Як передавати JSON обєкти як URL параметри
I know this could be a later post, but, for new visitors I will share my solution, as the OP was asking for a way to pass JSON object via GET (not POST as suggested in other answers).

Take the JSON object and convert it to string (JSON.stringify)
Take the string and encode it in Base64 (you can find some useful info on this here)
Append it to the URL and make the GET call
Reverse the process. decode and parse it into an object
I have used this in some cases where I only can do GET calls and it works. Also, this solution is practically cross language.