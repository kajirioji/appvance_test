function question4() {
    const statement = '4. Describe at least 3 design patterns and 2 anti-patterns.\n';
    console.log(statement);
    console.log('Design patterns\n');

    console.log('Factory');
    console.log('It is a creational pattern in which an interface to create a single object is defined, but it let subclasses decide which class to instantiate. It is considered an alternative to constructors. Unlike constructors they can return an object of any subtype of their return type. It is used when it is not know what concrete class it will be required at runtime but it is wanted to get a class that will do the job.\n');

    console.log('Module');
    console.log('The idea with this structural design pattern is to group related elements (classes, methods, other modules, etc.) into a single entity. It provides structure and helps organize the code. Its implementation depends highly on the programming language and framework.\n');

    console.log('Guarded suspension');
    console.log('It is a concurrent design pattern that allows an operation until a condition is met, if not it remains locked. It involves suspending the method call and the calling thread until the condition is satisfied.\n');


    console.log('\nDesign anti-patterns\n');

    console.log('Singleton Anti-Pattern');
    console.log('Ensure a class has only one instance, and provide a global point of access to it. When it is misused, it introduces unnecessary restrictions in situations where a sole instance of a class is not actually required, and introduces global state into an application. The singleton pattern makes code more complex, less useful, and can become a bottleneck during development and debugging.\n');

    console.log('Cut-And-Paste Programming');
    console.log('It creates code duplication, bugs reoccurs all over the code. It would be easier to create reusable code.\n');

    console.log('Silver Bullet (Golden hammer)');
    console.log('It happens when it is thought that one solution is suitable for all the problems (especially when speaking about programming language, frameworks or even design patterns). As a result of Golden hammer is poorly performing, redundant overcomplicated code.\n');

}

question4();
