<script lang="ts">
    import { handleChangePreferences } from "$lib/utils/index";
    
    let primaryColor = "var(--secondary)";
    let secondaryColor = "white";
  
    let {
      id = `slider-${Math.random().toString(36).substring(2, 9)}`,  // Generate unique ID for each instance
      value = 50,
      min = 0,
      max = 100,
      step = 5,
      label = "",
      propertyToChange = "", // Add property path for preferences
      onChange = (newValue: number) => {}
    } = $props();
  
    let showValue = $state(false); // Hidden at start
    let hideTimeout: ReturnType<typeof setTimeout>;
    let sliderEl: HTMLInputElement;
  
    // Function to update the slider background gradient
    function updateSliderBackground() {
      if (sliderEl) {
        const percent = ((value - min) / (max - min)) * 100;
        sliderEl.style.background = `linear-gradient(to right, ${primaryColor} ${percent}%, ${secondaryColor} ${percent}%)`;
      }
    }
  
    // Initial effect to apply background and trigger onChange
    $effect(() => {
      updateSliderBackground();
      onChange(value);
    });
  
    function handleInput(e: Event) {
      const input = e.target as HTMLInputElement;
      value = Number(input.value);
      updateSliderBackground();
  
      showValue = true;
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        showValue = false;
      }, 1500);
      
      // Call onChange callback
      onChange(value);
      
      // Update preferences if propertyToChange is provided
      if (propertyToChange) {
        // Set data attributes for the event target
        input.dataset.property = propertyToChange;
        input.dataset.value = value.toString();
        
        // Call handleChangePreferences with the current event
        handleChangePreferences(e as MouseEvent);
      }
    }
  </script>
  
  <div class="slider-container" style="width: 100%;">
    {#if label}
      <div class="slider-label">{label} <span class="percentage-value">{value}%</span></div>
    {/if}
    <div class="range-wrapper" style="width: 100%;">
      <!-- Value indicator appears during interaction -->
      <div 
        class="value-indicator {showValue ? 'visible' : ''}" 
        style="left: calc((({value} - {min}) / ({max} - {min})) * 100%)"
      >
        {value}%
      </div>
  
      <input
        id={id}
        type="range"
        bind:value
        bind:this={sliderEl}
        min={min}
        max={max}
        step={step}
        oninput={handleInput}
        data-property={propertyToChange}
        data-value={value.toString()}
      />
  
      <div class="range-labels">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  </div>
  
  <style>
    .slider-container {
      padding: 1rem 0;
      border-radius: 8px;
      display: flex;
      max-width: 100%;
      flex-direction: column;
      align-items: center;
    }
  
    .slider-label {
      color: white;
      font-size: 1.25rem;
      font-weight: bold;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
      margin-bottom: 0.5rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .percentage-value {
      background-color: rgba(0,0,0,0.2);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.9rem;
    }
  
    .range-wrapper {
      position: relative;
    }
  
    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 6px;
      border-radius: 5px;
      outline: none;
      transition: background 0.3s;
      margin: 10px 0;
      position: relative;
    }
  
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      border: 2px solid #ccc;
      cursor: pointer;
      box-shadow: 0 0 2px rgba(0,0,0,0.3);
      position: relative;
      top: 0;
    }
  
    input[type="range"]::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      border: 2px solid #ccc;
      cursor: pointer;
    }

    input[type="range"]:focus {
      transform: none;
    }
  
    .range-labels {
      display: flex;
      justify-content: space-between;
      margin-top: 0.3rem;
      font-weight: bold;
      font-size: 1rem;
      color: white;
      text-shadow: 1px 1px 2px black;
    }
  
    .value-indicator {
      position: absolute;
      top: -35px;
      transform: translateX(-50%);
      background-color: white;
      color: black;
      font-weight: bold;
      padding: 2px 6px;
      border-radius: 6px;
      font-size: 1.2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      pointer-events: none;
      user-select: none;
      z-index: 2;
      opacity: 0;
      transition: opacity 0.3s ease, left 0.2s ease;
    }
  
    .value-indicator.visible {
      opacity: 1;
    }
  </style>