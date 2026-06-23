// sanity.config.ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Yayasan Generasi Indonesia Mengaji', // Nama ringkas di tab browser

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ID_PROJECT_ANDA_JIKA_BELUM_SET_ENV',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },

  // 🚀 FITUR 1: KUSTOMISASI TAMPILAN (STUDIO COMPONENTS)
  studio: {
    components: {
      // Mengubah teks polos pojok kiri atas menjadi branding yang elegan
      navbar: (props) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', 
            color: 'white', 
            padding: '10px 20px', 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'between',
            borderBottom: '1px solid #064e3b',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>💚</span>
              <div>
                <h1 style={{ margin: 0, fontSize: '14px', fontWeight: 900, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Yayasan Generasi Indonesia Mengaji
                </h1>
                <p style={{ margin: 0, fontSize: '10px', color: '#a7f3d0', fontWeight: 600 }}>
                  DASHBOARD MANAJEMEN UTAMA
                </p>
              </div>
            </div>
          </div>
          {props.renderDefault(props)}
        </div>
      ),
    },
  },

  // 🚀 FITUR 2: SKEMA WARNA EMERALD & EMAS (THEMING)
  theme: {
    // Override CSS variabel dasar Sanity untuk memunculkan nuansa islami & premium
    '--black': '#1f2937',
    '--white': '#ffffff',
    '--brand-primary': '#059669', // Emerald Green utama
    '--component-bg': '#ffffff',
    '--component-text-color': '#1f2937',
    '--focus-color': '#fbbf24',    // Emas/Kuning aksen fokus saat diklik
  }
});