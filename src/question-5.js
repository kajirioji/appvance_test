
function question5() {
    const statement = '5. Every fortnite (15 days) you get a map to a secret treasure. It is known that the treasure can be only in 2 known places.' +
        'The map must be decoded but it take 4 days to decode it. And you cannot start walking until you decode it.' +
        'It takes 5 days to reach each any place from your location and to travel between them.' +
        'there is a dark elf which can decode the map immediately but in exchange, she wants 3 days worth of dragon takings.' +
        'Describe which is the best strategy and why.\n';
    console.log(statement);

    console.log('Assuming that right after you get the map you can start decoding the map, and as soon it is decoded, you can start traveling (the same day):\n');
    console.log('Scenario 1');
    console.log('If we ignore the dark elf. We would still get the first map on day 15, got it decoded on day 18, start traveling and reaching the first location on day 22.');
    console.log('We would get the second map on day 30, decoded by day 33 and reach it on day 37, for a total of 37 of dragon takings.\n');

    console.log('Scenario 2');
    console.log('If we take the offer the dark elf, for both maps. We would still get the first map on day 15, got it decoded the same day, start traveling and reaching the first location on day 19, costing 22 dragon takings so far.');
    console.log('We would get the second map on day 30, decoded the same day and reach it on day 34, for a total of 40 of dragon takings.\n');

    console.log('Best strategy');
    console.log('The dark elf is not granting any benefit in terms of cost but in time. We would be getting the treasure 3 days earlier in both treasure hunting travels, but in the first one costing 3 days worth of dragon takings (which is fine) and in the second one costing 6 days worth of dragon takings (which is not good)');
    console.log('So, I would not use the dark elf for the first map, but I would use her for the second map. I would definitively get the treasure by day 34 but costing only 37 days worth of dragon takings.');
}

question5();
