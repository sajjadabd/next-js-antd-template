"use client"

import React , { useState } from 'react';

import { Timeline } from 'antd';

export default function App () {
  return (
    <div>
        <Timeline
            items={[
            {
                color: 'gray',
                children: (
                <>
                    <h4>استند 1</h4>
                    <ul>
                        <li>غلطک بالا</li>
                        <li>غلطک پایین</li>
                    </ul>
                </>
                ),
            },
            {
                color: 'gray',
                children: (
                <>
                    <h4>استند 2</h4>
                    <ul>
                        <li>غلطک بالا</li>
                        <li>غلطک پایین</li>
                    </ul>
                </>
                ),
            },
            {
                color: 'gray',
                children: (
                <>
                    <h4>استند 3</h4>
                    <ul>
                        <li>غلطک بالا</li>
                        <li>غلطک پایین</li>
                    </ul>
                </>
                ),
            },
            {
                color : 'gray',
                children: (
                <>
                    <h4>استند 4</h4>
                    <ul>
                        <li>غلطک بالا</li>
                        <li>غلطک پایین</li>
                    </ul>
                </>
                ),
            },
            {
                color: 'gray',
                children: (
                <>
                    <h4>استند 5</h4>
                    <ul>
                        <li>غلطک بالا</li>
                        <li>غلطک پایین</li>
                    </ul>
                </>
                ),
            },
            {
                color: 'gray',
                children: (
                <>
                    <h4>استند 6</h4>
                    <ul>
                        <li>غلطک بالا</li>
                        <li>غلطک پایین</li>
                    </ul>
                </>
                ),
            },
            {
                color: 'gray',
                children: (
                <>
                    <h4>استند 7</h4>
                    <ul>
                        <li>غلطک بالا</li>
                        <li>غلطک پایین</li>
                    </ul>
                </>
                ),
            },
            ]}
        />
    </div>
  );
};

