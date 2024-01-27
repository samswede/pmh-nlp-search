// TestONNXButton.js
import React from 'react';
import { Button } from '@nextui-org/react';

import testONNX from '../../hooks/testONNX';
import testORTWeb from '../../hooks/testORT';

export default function TestONNXButton() {
    const handleOnClick = async () => {
        await testORTWeb();
    };

    return (
        <Button 
            color="primary"
            variant="flat"
            onClick={handleOnClick}>
            Test ONNX
        </Button>
    );
};
