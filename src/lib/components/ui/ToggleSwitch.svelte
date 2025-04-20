<script lang="ts">
	import type { ToggleSwitchProps } from "$lib/types";
	import { handleChangePreferences } from "$lib/utils/index";
	// Define props with defaults
	let { 
	  // Original boolean toggle props
	  isActive = true, 
	  enableText = "Activar", 
	  disableText = "Desactivar", 
	  
	  // Multi-option props
	  options = [], // Array of option objects
	  selectedOption = "", // Currently selected option value
	  propertyToChange = "",
	  multiOption = false // Whether to use multi-option mode or boolean toggle
	}: ToggleSwitchProps = $props();
	
	// Initialize states
	let isActiveState = $state(isActive);
	let selectedOptionState = $state(selectedOption || (options.length > 0 ? options[0].value : ""));
	
	// Handle binary toggle
	function toggleActive(event: Event) {
	  isActiveState = !isActiveState;
	  
	  if (propertyToChange) {
		const target = event.currentTarget as HTMLElement;
		target.dataset.property = propertyToChange;
		target.dataset.value = isActiveState.toString();
		
		handleChangePreferences(event as MouseEvent);
	  }
	}
	
	// Handle multi-option selection
	function selectOption(value: string, event: Event) {
	  selectedOptionState = value;
	  
	  if (propertyToChange) {
		const target = event.currentTarget as HTMLElement;
		target.dataset.property = propertyToChange;
		target.dataset.value = value;
		
		handleChangePreferences(event as MouseEvent);
	  }
	}
	
	function handleKeyDown(event: KeyboardEvent, action: () => void) {
	  if (event.key === 'Enter' || event.key === ' ') {
		event.preventDefault();
		action();
	  }
	}
  </script>
  
  <style>
	.toggle-wrapper {
	  padding: 10px 0;
	  border-radius: 8px;
	  display: inline-block;
	  user-select: none;
	  font-size: var(--font-size-small);
	}
  
	span, button {
	  color: var(--primary-content);
	  text-shadow: var(--shadow-border-medium);
	  transition: all 0.3s ease;
	  padding: 0 4px;
	}
	
	button {
	  background: none;
	  border: none;
	  font-family: inherit;
	  font-size: inherit;
	  cursor: pointer;
	  padding: 0 4px;
	  margin: 0;
	  outline: none;
	}
	
	button:focus-visible {
	  outline: 2px solid var(--secondary);
	  border-radius: 4px;
	}
  
	/* Active selection overrides color */
	.active {
	  color: var(--secondary) !important;
	}
  
	.inactive {
	  color: var(--primary-content) !important;
	}
  </style>
  
  {#if multiOption && options.length > 0}
	<div class="toggle-wrapper" role="radiogroup" aria-label={propertyToChange}>
	  {#each options as option, i}
		<button 
		  type="button"
		  class="{selectedOptionState === option.value ? 'active' : 'inactive'}"
		  onclick={(e) => selectOption(option.value, e)}
		  onkeydown={(e) => handleKeyDown(e, () => selectOption(option.value, e))}
		  aria-checked={selectedOptionState === option.value}
		  role="radio"
		  data-property={propertyToChange}
		  data-value={option.value}
		>
		  {option.label}
		</button>
		
		{#if i < options.length - 1}
		  <span> / </span>
		{/if}
	  {/each}
	</div>
  {:else}
	<!-- Original boolean toggle -->
	<div class="toggle-wrapper" role="group" aria-label="Toggle switch">
	  <button 
		type="button"
		class="activar {isActiveState ? 'active' : 'inactive'}"
		onclick={toggleActive}
		onkeydown={(e) => handleKeyDown(e, () => toggleActive(e))}
		aria-pressed={isActiveState ? "true" : "false"}
		data-property={propertyToChange}
		data-value={isActiveState.toString()}
	  >
		{enableText}
	  </button>
	  <span> / </span>
	  <button
		type="button"
		class="desactivar {!isActiveState ? 'active' : 'inactive'}"
		onclick={toggleActive}
		onkeydown={(e) => handleKeyDown(e, () => toggleActive(e))}
		aria-pressed={!isActiveState ? "true" : "false"}
		data-property={propertyToChange}
		data-value={(!isActiveState).toString()}
	  >
		{disableText}
	  </button>
	</div>
  {/if}