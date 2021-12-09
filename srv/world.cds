using sap.cim.Books as b from '../db/schema';

service say {
    function hello(to : String) returns String;
    entity Books as projection on b.Books;
}
