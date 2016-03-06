// JSON = JavaScript Object Notation

// from json.org: 
    // JSON is a lightweight data-interchange format. It is easy for humans to read and write. 
    // It is easy for machines to parse and generate. It is based on a subset of the JavaScript 
    // Programming Language, Standard ECMA-262 3rd Edition - December 1999. JSON is a text format 
    // that is completely language independent but uses conventions that are familiar to programmers 
    // of the C-family of languages, including C, C++, C#, Java, JavaScript, Perl, Python, and many others. 
    // These properties make JSON an ideal data-interchange language.


// the file has extension .json
// Pretty much the same objects are allowed the same as javascript, except NO functions
// see http://json.org/ for more details

// Example:

var data = 
{"users":
    [
        {
            "firstName":"Ray",
            "lastName":"Villalobos",
            "joined":2012
        },
        {
            "firstName":"John",
            "lastName":"Jones",
            "joined":2010
        }
    ]
};

// this JSON object called "data" is now packaged and can be sent

// on the other end, the values can be accessed like this:
// data.users[0].firstName; returns string "Ray"
// data.users[1].joined; returns number 2010