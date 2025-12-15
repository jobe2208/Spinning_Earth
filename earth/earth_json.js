import * as THREE from "https://unpkg.com/three@0.164.0/build/three.module.js";
import { lonLatToVector3 } from './earth_geometry.js';

export function addMergedDotsFromGeoJSON(sphere, geoJSON) {
    const positions = [];

    geoJSON.features.forEach(feature => {
        const geom = feature.geometry;

        if (geom.type === "MultiPolygon") {
            geom.coordinates.forEach(polygon =>
                polygon.forEach(ring =>
                    ring.forEach(([lon, lat]) => {
                        const v = lonLatToVector3(lon, lat);
                        positions.push(v.x, v.y, v.z);
                    })
                )
            );
        }

        if (geom.type === "Polygon") {
            geom.coordinates.forEach(ring =>
                ring.forEach(([lon, lat]) => {
                    const v = lonLatToVector3(lon, lat);
                    positions.push(v.x, v.y, v.z);
                })
            );
        }
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.001,
    });

    const points = new THREE.Points(geometry, material);
    sphere.add(points);
}

export async function loadGeoJSON(sphere) {
    try {
        const response = await fetch('countries.geojson');
        const data = await response.json();
        addMergedDotsFromGeoJSON(sphere, data);
    } catch (error) {
        console.error('Error loading GeoJSON:', error);
    }
}
