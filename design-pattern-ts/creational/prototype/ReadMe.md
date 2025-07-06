Prototype is used to depp copy objects.

The idea behind it is to decouple the logic of creation from the client side.

so client should call only the clone method and new object is presented to the client.

primitive are constant data types like string, int, float, etc.
component are array , Set, Map, Custom Data Types or INterfaces which requires some logic to avoid shared references which cloning
Circular Reference referes to previous object or 