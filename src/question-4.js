function question4() {
    const statement = '4. Describe at least 3 design patterns and 2 anti-patterns.\n';
    console.log(statement);
    console.log('Design patterns\n');
    console.log('Factory');
    console.log('Define an interface for creating a single object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.');

    console.log('\nDesign anti-patterns\n');
    console.log('Singleton'); //https://stackoverflow.com/questions/12755539/why-is-singleton-considered-an-anti-pattern
    console.log('Ensure a class has only one instance, and provide a global point of access to it.');
    console.log('it is overused, introduces unnecessary restrictions in situations where a sole instance of a class is not actually required, and introduces global state into an application');
    console.log('In short, the singleton pattern makes code more complex, less useful, and a real pain to re-use or test. Eliminating singletons can be tricky, but it’s a worthwhile endeavour.');
    /*
    https://sourcemaking.com/antipatterns/software-development-antipatterns

    * Cut-and-Paste Programming
Code reused by copying source statements leads to significant maintenance problems. Alternative forms of reuse, including black-box reuse, reduce maintenance issues by having common source code, testing, and documentation.
* */
}

question4();
