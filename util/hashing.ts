const { createHash } = require('crypto');

// Create a string hash

export default function hash(input: string): string {
    return createHash('sha256').update(input).digest('base64');
}


